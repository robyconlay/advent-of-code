file = open('input.txt' , "r")

chargers = []
total = 1
currentJolts = 0
values = [1, 2, 4, 7]   # number of arrangements of 1, 2, 3 and 4 1-jolt differences

for line in file:
    chargers.append(int(line.replace("\n", "")))
chargers.append(0)
chargers.append(max(chargers) + 3)

chargers.sort()

for i in range(0, len(chargers) - 1):
    if chargers[i] == chargers[i+1] - 1:
        currentJolts += 1
    elif chargers[i] == chargers[i+1] - 3: # 3-jolts ha only one way to arrange
        if currentJolts > 0:
            total *= values[currentJolts - 1]
        currentJolts = 0

print(f"The total number of distinct ways you can arrange the adapters to connect the charging outlet to your device is {total}")