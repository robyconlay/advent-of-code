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
        if el[0] == 'byr':
            valid = re.match("\d", el[1]) and int(el[1]) >= 1920 and int(el[1]) <= 2002
        elif el[0] == 'iyr':
            valid = re.match("\d", el[1]) and int(el[1]) >= 2010 and int(el[1]) <= 2020
        elif el[0] == 'eyr':
            valid = re.match("\d", el[1]) and int(el[1]) >= 2020 and int(el[1]) <= 2030
        elif el[0] == 'hgt':
            valid = (re.match("^\d{3}cm$", el[1]) != None and int(el[1].replace("cm", "")) >= 150 and int(el[1].replace("cm", "")) <= 193)
            valid = valid or (re.match("^\d{2}in$", el[1]) != None and int(el[1].replace("in", "")) >= 59 and int(el[1].replace("in", "")) <= 76)
        elif el[0] == 'hcl':
            valid = re.search("^#{1}[0-9a-f]{6}$", el[1]) != None
        elif el[0] == 'ecl':
            valid = re.match("^(amb|blu|brn|gry|grn|hzl|oth)$", el[1]) != None
        elif el[0] == 'pid':
            valid = re.match("^\d{9}$", el[1]) != None
        if not valid:
            break

    if valid:
        total += 1

print(f"total valid passports: {total}")

