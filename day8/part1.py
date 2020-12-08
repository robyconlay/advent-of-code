file = open('input.txt', "r")

lines = []
alreadyRun = []
counter = 0

for line in file:
    lines.append(line)
    alreadyRun.append(False)

i = 0
while not alreadyRun[i]:
    alreadyRun[i] = True
    (op, num) = lines[i].split()
    if op == 'acc':
        counter += int(num)
        i += 1
    elif op == 'nop':
        i += 1
    else:
        i += int(num)

print(f"Value of accumulator immidiately before an instruction is run a second time is {counter}")