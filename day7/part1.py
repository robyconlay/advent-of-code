file = open('input.txt', "r")

bags = {}
canContain = {}

for line in file:
    line = line.split()
    bag = line[0] + " " + line[1]
    canContain[bag] = None

    contained = []
    i = 5

    if not "other" in line:
        while i < len(line) -1:
            contained.append((line[i] + " " + line[i+1]).replace(",", ""))
            i += 4
    
    bags[bag] = contained

def check(values):
    valid = False
    for value in values:
        if canContain[value] is None:
            valid = valid or check(bags[value])
        else:
            valid = valid or canContain[value]  
    return valid

canContain["shiny gold"] = False
for bag in bags:
    if len(bags[bag]) == 0:
        canContain[bag] = False
    elif "shiny gold" in bags[bag]:
        canContain[bag] = True

for bag in bags:
    if canContain[bag] is None:
        canContain[bag] = check(bags[bag])

total = 0
for bag in bags: 
    if canContain[bag]:
        total += 1

print(f"total bags that can contain the shiny gold bag are {total}")