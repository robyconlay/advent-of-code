import sys

if len(sys.argv) < 2:
    print("Missing input file in command")
    sys.exit(1)

file = open(sys.argv[1], "r")

yes = set()
total = 0

for line in file:
    if line == '\n':
        total += len(yes)
        yes.clear()
    else:
        yes.update(set(line.replace("\n", "")))

total += len(yes)

print(f"The sum of all \"yes\" answers of every group is {total}")
