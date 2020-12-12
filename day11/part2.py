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
            if grid[i][j] == '.':
                continue
            adjacent = 0

            k = i + 1
            while k < len(grid) and not grid[k][j] == 'L':
                if grid[k][j] == '#':
                    #print(f"grid[{k}][{j}]: {grid[k][j]}")
                    adjacent += 1
                    break 
                k += 1
            k = i -1
            while k >= 0 and not grid[k][j] == 'L':
                if grid[k][j] == '#':
                    adjacent += 1
                    break 
                k -= 1
            h = j+1
            while h < linelength and not grid[i][h] == 'L':
                if grid[i][h] == '#':
                    adjacent += 1
                    break 
                h += 1
            h = j -1
            while h >= 0 and not grid[i][h] == 'L':
                if grid[i][h] == '#':
                    adjacent += 1
                    break 
                h -= 1

            k = i +1
            h = j +1
            while k < len(grid) and h < linelength and not grid[k][h] == 'L':
                if grid[k][h] == '#':
                    adjacent += 1
                    break 
                k += 1
                h += 1
            k = i -1
            h = j+1
            while k >= 0 and h < linelength and not grid[k][h] == 'L':
                if grid[k][h] == '#':
                    adjacent += 1
                    break 
                k -= 1
                h += 1
            k = i +1
            h = j -1
            while k < len(grid) and h >= 0 and not grid[k][h] == 'L':
                if grid[k][h] == '#':
                    adjacent += 1
                    break 
                k += 1
                h -= 1
            k = i-1
            h = j-1
            while k >= 0 and h >= 0 and not grid[k][h] == 'L':
                if grid[k][h] == '#':
                    adjacent += 1
                    break 
                k -= 1
                h -= 1

            if grid[i][j] == 'L' and adjacent == 0:
                nextSimulation[i][j] = '#'
            elif grid[i][j] == '#' and adjacent >= 5:
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

            