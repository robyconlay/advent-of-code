file = open("input.txt", "r")
sol = 0;

input = []

for number in file:
   input.append(int(number))

for number1 in input:
    for number2 in input:
        for number3 in input:
            if number1 +number2 + number3 == 2020:
                sol = number1 * number2 * number3
                break

print("solution: " + str(sol))
