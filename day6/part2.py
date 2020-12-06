import sys

if len(sys.argv) < 2:
    print("Missing input file in command")
    sys.exit(1)

file = open(sys.argv[1], "r")

yes = set()
total = 0
first = True

for line in file:
    if line == '\n':
        total += len(yes)
        yes.clear()
        first = True
    else:
        person = set(line.replace("\n", ""))
        if first:
            yes = yes.union(person)
            first = False
        else:
            yes = yes.intersection(person)

total += len(yes)
print(f"The sum of all \"yes\" answers shared by all members of a group is {total}")
