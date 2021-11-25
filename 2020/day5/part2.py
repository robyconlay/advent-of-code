import sys

if len(sys.argv) < 2:
    print("Missing input file in command")
    sys.exit(1)

file = open(sys.argv[1], "r")

IDs = []

for line in file:
    row = int(line.replace("F", "0").replace("B", "1")[0:7], 2)
    col = int(line.replace("L", "0").replace("R", "1")[7:10], 2)
    IDs.append(row * 8 + col)

IDs.sort()

for i in range(len(IDs) - 1):
    if IDs[i] == IDs[i+1] - 2:
        print(f"Your ID is {IDs[i] + 1}")