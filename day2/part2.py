file = open("input.txt", "r")

valid = 0

for line in file:
    line = line.split()
    line[0] = line[0].split('-')

    pos1 = int(line[0][0])
    pos2 = int(line[0][1])
    letter = line[1].replace(':', "")
    seq = list(line[2])
 
    if (seq[pos1 - 1] == letter) ^ (seq[pos2 - 1] == letter):
        valid += 1

print(f"solution: {valid}")
