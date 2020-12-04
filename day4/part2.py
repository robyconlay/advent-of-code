import re

file = open("input.txt", "r")

lines = []
newline = ""
total = 0
validlines = []

for line in file:
    if line == '\n':
        lines.append(newline)
        newline = ""
    else: 
        newline += line.replace("\n"," ")
lines.append(newline)
    
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
        validlines.append(line)

for line in validlines:
    valid = True
    for el in line:
        el = el.split(":")
        print(el)
        if el[0] == 'byr':
            if re.match("\d", el[1]) and not(int(el[1]) >= 1920 and int(el[1]) <= 2002):
                valid = False
                break
        elif el[0] == 'iyr':
            if re.match("\d", el[1]) and not(int(el[1]) >= 2010 and int(el[1]) <= 2020):
                valid = False
                break
        elif el[0] == 'eyr':
            if re.match("\d", el[1]) and not(int(el[1]) >= 2020 and int(el[1]) <= 2030):
                valid = False
                break
        elif el[0] == 'hgt':
            if re.match("^\d{3}cm$", el[1]) != None:
                if not(int(el[1].replace("cm", "")) >= 150 and int(el[1].replace("cm", "")) <= 193):
                    valid = False
                    break
            elif re.match("^\d{2}in$", el[1]) != None:
                if not(int(el[1].replace("in", "")) >= 59 and int(el[1].replace("in", "")) <= 76):
                    valid = False 
                    break
            else:
                valid = False
        elif el[0] == 'hcl':
            if re.search("^#{1}[0-9a-f]{6}$", el[1]) == None:
                valid = False
                break
        elif el[0] == 'ecl':
            if re.match("^(amb|blu|brn|gry|grn|hzl|oth)$", el[1]) == None:
                valid = False
                break
        elif el[0] == 'pid':
            if re.match("^\d{9}$", el[1]) == None:
                valid = False
                break

    if valid:
        total += 1

print(f"total: {total}")

