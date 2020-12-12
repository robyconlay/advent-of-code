file = open('input.txt' , "r")

chargers = []
jolt1 = 1
jolt3 = 1

for line in file:
    chargers.append(int(line.replace("\n", "")))
chargers.sort()

for i in range(0, len(chargers) - 1):
    if chargers[i] == chargers[i+1] - 1:
        jolt1 += 1
    elif chargers[i] == chargers[i+1] - 3:
        jolt3 += 1

print(f"The number of 1-jolt differences multiplied by the number of 3-jolt differences is {jolt1 * jolt3}")