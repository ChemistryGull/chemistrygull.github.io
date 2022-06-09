import RPi.GPIO as GPIO
from time import sleep

print("\n")
print("Initializing Motor settings...")

in1 = 24
in2 = 23
in3 = 0
in4 = 0

enA = 25
enB = 0

zero = 5


GPIO.setmode(GPIO.BCM) #may change to BOARD
GPIO.setup(in1, GPIO.OUT)
GPIO.setup(in2, GPIO.OUT)
GPIO.setup(in3, GPIO.OUT)
GPIO.setup(in4, GPIO.OUT)
GPIO.setup(enA, GPIO.OUT)
GPIO.setup(enB, GPIO.OUT)

GPIO.output(in1, GPIO.LOW)
GPIO.output(in2, GPIO.LOW)
GPIO.output(in3, GPIO.LOW)
GPIO.output(in4, GPIO.LOW)
pA = GPIO.PWM(enA, 1000)
pB = GPIO.PWM(enB, 1000)
pA.start(25)
pB.start(25)

print("Finnished")
print("\n")



def motorSet(side, value):

    if side == "L":
        inA = in1
        inB = in2
    elif side == "R":
        inA = in3
        inB = in4


    if abs(value) <= zero:
        GPIO.output(inA, GPIO.LOW)
        GPIO.output(inB, GPIO.LOW)

    elif value < 0:
        GPIO.output(inA, GPIO.HIGH)
        GPIO.output(inB, GPIO.LOW)
        p.ChangeDutyCycle(abs(value))

    elif value > 0:
        GPIO.output(inA, GPIO.LOW)
        GPIO.output(inB, GPIO.HIGH)
        p.ChangeDutyCycle(abs(value))


    else:
        GPIO.cleanup()
        print("Code ends here, no idea how we got there")



while True:
    inp = input("---> ")

    if inp == " ":
        motorSet("L", 0)
        motorSet("R", 0)

    elif inp == "w":
        motorSet("L", 50)
        motorSet("R", 50)

    elif inp == "a":
        motorSet("L", -50)
        motorSet("R", 50)

    elif inp == "d":
        motorSet("L", 50)
        motorSet("R", -50)

    elif inp == "s":
        motorSet("L", -50)
        motorSet("R", -50)

    elif inp == "1":
        motorSet("L", 10)
        motorSet("R", 10)

    elif inp == "2":
        motorSet("L", 20)
        motorSet("R", 20)

    elif inp == "3":
        motorSet("L", 30)
        motorSet("R", 30)

    elif inp == "4":
        motorSet("L", 40)
        motorSet("R", 40)

    elif inp == "5":
        motorSet("L", 50)
        motorSet("R", 50)

    elif inp == "6":
        motorSet("L", 60)
        motorSet("R", 60)

    elif inp == "7":
        motorSet("L", 70)
        motorSet("R", 70)

    elif inp == "8":
        motorSet("L", 80)
        motorSet("R", 80)

    elif inp == "9":
        motorSet("L", 90)
        motorSet("R", 90)

    elif inp == "0":
        motorSet("L", 100)
        motorSet("R", 100)
