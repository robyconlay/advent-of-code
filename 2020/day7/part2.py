file = open('input.txt', "r")

bags = {}

for line in file:
    line = line.split()
    bag = line[0] + " " + line[1]

    contained = []
    i = 4

    if not "other" in line:
        while i < len(line) - 1:
            contained.append((line[i] + " " + line[i + 1] + " " + line[i + 2]).replace(",", ""))
            i += 4
    
    bags[bag] = contained

def calcTotal(values):
    if len(values) == 0:
        return 0
    total = 0
    for value in values:
        number = int(value.split()[0])
        value = value.split()[1] + " " + value.split()[2]
        total += (number * calcTotal(bags[value]) + number)
    return total

total = calcTotal(bags["shiny gold"])

print(f"number of bags that a shiny gold bag must contain is {total}")