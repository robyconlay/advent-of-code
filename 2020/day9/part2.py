file = open('input.txt', "r")

invalid = 21806024
lines = []
current = []
sum = 0

for line in file:
    lines.append(int(line.replace("\n", "")))

i = 0
while sum != invalid: 
    if sum > invalid:
        sum -= current.pop(0) 
    else:
        current.append(lines[i])
        sum += lines[i]
        i += 1

print(f"the encryption weakness in your XMAS-encrypted list of numbers is {max(current) + min(current)}")


