
file = open("day1/input.txt", "r")
sol = 0;


lessThan1000 = []
moreThan1000 = []

for number in file:
    if int(number) < 1000:
        lessThan1000.append(int(number))
    else:
        moreThan1000.append(int(number))

for number1 in lessThan1000:
    for number2 in moreThan1000:
        if number1 + number2 == 2020:
            sol = number1 * number2
            print(str(number1) + " " + str(number2))
            break

print("solution: " + str(sol))