import sys

if len(sys.argv) < 2:
    print("Missing input file in command")
    sys.exit(1)

file = open(sys.argv[1], "r")

highestID = 0

for line in file:
    row = int(line.replace("F", "0").replace("B", "1")[0:7], 2)
    col = int(line.replace("L", "0").replace("R", "1")[7:10], 2)
    highestID = max(highestID, row * 8 + col)

print(f"highest ID is {highestID}")