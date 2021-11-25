file = open('input.txt', "r")

foresta = []

col = 0
counter = 0

for line in file:
    foresta.append(line)

for line in foresta:
    col = col % (len(line) - 1)
    if line[col] == '#':
        counter += 1
    col += 3
    
print(f"number of tree encountered: {counter}")