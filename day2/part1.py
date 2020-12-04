file = open("input.txt", "r")

valid = 0

for line in file:
    line = line.split()
    line[0] = line[0].split('-')

    min = int(line[0][0])
    max = int(line[0][1])
    letter = line[1].replace(':', "")
    seq = list(line[2]) 
    counter = 0
    for i in seq:
        if i == letter:
            counter += 1

    if counter >= min and counter <= max:
        valid += 1

print(f"solution: {valid}")
