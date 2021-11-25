file = open("input.txt", "r")

lines = []
newline = ""

for line in file:
    if line == '\n':
        lines.append(newline)
        newline = ""
    else: 
        newline += line.replace("\n"," ")
lines.append(newline)
    
total = 0

for line in lines:
    line = line.replace("\n", " ")[:-1].split()

    if len(line) == 8:
        valid = True
    elif len(line) <= 6:
        valid = False
    else:
        valid = True
        for el in line:
            if el.startswith("cid"):
                valid = False
                break
    if valid:
        total += 1

print(f"total valid passports: {total}")
