file = open('input.txt', "r")

foresta = []

col = 0
counter = 0
total = 1
pattern = [1, 3, 5, 7]


for line in file:
    foresta.append(line)

for i in pattern:
    for line in foresta:
        col = col % (len(line) - 1)
        if line[col] == '#':
            counter += 1
        col += i
    total *= counter
    counter = 0
    col = 0

j = -1
for line in foresta:
    j += 1
    if j % 2 == 1:
        continue
    col = col % (len(line) - 1)
    if line[col] == '#':
        counter += 1
    col += 1

total *= counter
    
print(f"product of all numbers of tree encountered in all slopes: {total}")
