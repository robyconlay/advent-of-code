file = open('input.txt', "r")

grid = []
nextSimulation = []
changed = True

for line in file:
    grid.append(list(line.replace("\n", "")))
    nextSimulation.append(list(line.replace("\n", "")))

linelength = len(grid[0])

for i in range (0, len(grid)):
    for j in range (0, linelength):
        if grid[i][j] == 'L':
            grid[i][j] = '#'

while changed:
    for i in range (0, len(grid)):
        for j in range (0, linelength):
            grid[i][j] = nextSimulation[i][j]

    for i in range (0, len(grid)):
        for j in range (0, linelength):
            adjacent = 0
            if i-1 >= 0 and grid[i-1][j] == '#': 
                adjacent += 1
            if i+1 < len(grid) and grid[i+1][j] == '#':
                adjacent += 1
            if j+1 < linelength and grid[i][j+1] == '#':
                adjacent += 1
            if j-1 >= 0 and grid[i][j-1] == '#':
                adjacent += 1
            if i+1 < len(grid) and j+1 < linelength and grid[i+1][j+1] == '#':
                adjacent += 1
            if i+1 < len(grid) and j-1 >= 0 and grid[i+1][j-1] == '#':
                adjacent += 1
            if i-1 >= 0 and j+1 < linelength and grid[i-1][j+1] == '#':
                adjacent += 1
            if i-1 >= 0 and j-1 >= 0 and grid[i-1][j-1] == '#':
                adjacent += 1

            if grid[i][j] == 'L' and adjacent == 0:
                nextSimulation[i][j] = '#'
            elif grid[i][j] == '#' and adjacent >= 4:
                nextSimulation[i][j] = 'L'
            else:
                nextSimulation[i][j] = grid[i][j]

    changed = False
    for i in range (0, len(grid)):
        for j in range (0, linelength):
            if not nextSimulation[i][j] == grid[i][j]:
                changed = True


total = 0
for i in range (0, len(grid)):
        for j in range (0, linelength):
            if grid[i][j] == '#':
                total += 1

print(f"The number of seats that end up occupied is {total}")