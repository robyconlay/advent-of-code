file = open('input.txt', "r")

number = None
preamble = []

for line in file:
    if len(preamble) < 25:
        preamble.append(int(line.replace("\n", "")))
    else:
        number = int(line.replace("\n", ""))
        valid = False
        for num1 in preamble:
            for num2 in preamble:
                if num1 + num2 == number:
                    valid = True

        if not valid:
            break
        
        preamble.pop(0)
        preamble.append(number)

print(f"the first invalid number for the XMAS cypher is {number}")