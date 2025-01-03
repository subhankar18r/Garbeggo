#include <Arduino.h>
#include <stdbool.h>
#include <WiFi.h>
#include <FirebaseESP32.h>

const char *ssid = "404";
const char *password = "wifi@1818";

#define FIREBASE_HOST "https://garbagego-3d3bb-default-rtdb.asia-southeast1.firebasedatabase.app/"
#define FIREBASE_AUTH "AIzaSyCg5eC9WKqnuelNaMXwfx6hbc6hBZ0sU8g"

FirebaseData firebaseData;
FirebaseAuth auth;
FirebaseConfig config;

typedef struct Dustbin
{
  int trig;
  int echo;
  int ledR;
  int ledG;
  const char *id;
  bool isFull;
} Dustbin;

const int DISTANCE_THRESHOLD = 3;

Dustbin dustbins[] = {
    {33, 32, 26, 27, "Dustbin-1", false},
};

int totalDustbins = sizeof(dustbins) / sizeof(dustbins[0]);

void setPinModes(Dustbin dustbin)
{
  pinMode(dustbin.trig, OUTPUT);
  pinMode(dustbin.echo, INPUT);
  pinMode(dustbin.ledR, OUTPUT);
  pinMode(dustbin.ledG, OUTPUT);
}

int getDistance(int trigPin, int echoPin)
{
  long duration;
  int distance;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;
  return distance;
}

void setup()
{
  Serial.begin(115200);

  // set pin modes for all dustbins
  for (int i = 0; i < totalDustbins; i++)
  {
    setPinModes(dustbins[i]);
  }

  // // WiFi connection
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to Wi-Fi");

  // Firebase connection
  config.database_url = FIREBASE_HOST;
  config.api_key = FIREBASE_AUTH;

  if (Firebase.signUp(&config, &auth, "", ""))
  {
    Serial.println("ok");
  }
  else
  {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  Serial.println("Connected to Firebase");
}

void loop()
{
  int distances[totalDustbins];
  Serial.println("Reading distances");
  for (int i = 0; i < totalDustbins; i++)
  {
    distances[i] = getDistance(dustbins[i].trig, dustbins[i].echo);
    Serial.print("Distance of : ");
    Serial.print(dustbins[i].id);
    Serial.println(distances[i]);
    delay(200);

    if (distances[i] <= DISTANCE_THRESHOLD)
    {
      digitalWrite(dustbins[i].ledR, HIGH);
      digitalWrite(dustbins[i].ledG, LOW);
      dustbins[i].isFull = true;
    }
    else
    {
      digitalWrite(dustbins[i].ledR, LOW);
      digitalWrite(dustbins[i].ledG, HIGH);
      dustbins[i].isFull = false;
    }

    FirebaseJson json;

    json.add(dustbins[i].id, dustbins[i].isFull);
    if (Firebase.setJSON(firebaseData, "/Dustbins", json))
    {
      Serial.println("Data pushed successfully");
    }
    else
    {
      Serial.println("Failed to push data");
      Serial.println(firebaseData.errorReason());
    }
  }
}