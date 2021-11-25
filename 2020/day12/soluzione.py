directions = ['N', 'E', 'S', 'W']

def part1(file):
    coordinates = [0, 0, 0, 0] #N, E, S, W
    currentDirection = 1

    for line in file:
        direction, amount = line[0], int(line[1:-1])
        if direction == 'R' or direction == 'L':
            currentDirection = (currentDirection + (1 if direction == 'R' else -1) * (amount // 90)) % 4
        elif direction == 'F':
            coordinates[currentDirection] += amount
        else:
            coordinates[directions.index(direction)] += amount

    return abs(coordinates[0] - coordinates[2]) + abs(coordinates[1] - coordinates[3])

def part2(file):
    waypoint = [1, 10, 0, 0] #N, E, S, W
    ship = [0, 0]

    for line in file:
        direction, amount = line[0], int(line[1:-1])
        if direction == 'R' or direction == 'L':
            shift = ((-1 if direction == 'R' else 1) * (amount // 90)) % 4
            waypoint = waypoint[shift:] + waypoint[:shift]
        elif direction == 'F':
            ship[0] += (waypoint[0] - waypoint[2]) * amount
            ship[1] += (waypoint[1] - waypoint[3]) * amount
        else:
            waypoint[directions.index(direction)] += amount

    return abs(ship[0] + ship[1])

def main():
    file = open('input.txt', "r")
    print(f"The Manhattan distance between the reached location and the ship's starting position is {part1(file)}")
    file.seek(0)
    print(f"The Manhattan distance between the reached location and the ship's starting position is {part2(file)}")


if __name__ == "__main__":
    main()