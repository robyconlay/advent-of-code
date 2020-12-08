file = open('input.txt', "r")

lines = []
alreadyRun = []

for line in file:
    lines.append(line)
    alreadyRun.append(False)

for j in range(0, len(lines) - 1):
    (change, nom) = lines[j].split()
    if change == 'acc':
        continue
    if change == 'nop':
        lines[j] = 'jmp ' + nom
    else:
        lines[j] = 'nop ' + nom

    i = 0
    counter = 0
    while i < len(lines) and not alreadyRun[i]:
        if i == len(lines) -1:
            print(f"Value of accumulator at the EOF is {counter}")
            break            

        alreadyRun[i] = True
        #print(f"line {i}, current call: {lines[i]}")
        (op, num) = lines[i].split()
        if op == 'acc':
            counter += int(num)
            i += 1
        elif op == 'nop':
            i += 1
        else:
            i += int(num)
              
    if change == 'nop':
        lines[j] = 'nop ' + nom
    else:
        lines[j] = 'jmp ' + nom
    
    for k in range (0, len(alreadyRun)):
        alreadyRun[k] = False
    

