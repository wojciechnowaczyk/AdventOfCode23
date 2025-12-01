input_file = "input.txt"

number_of_zeros = 0
current_value = 50

with open(input_file, "r") as file:
    for line in file:
        direction = line.strip()[0]
        move = int(line.strip()[1:])
        if direction == "R":
            current_value = (current_value + move) % 100
        elif direction == "L":
            current_value = (current_value - move) % 100
        if current_value == 0:
            number_of_zeros += 1
print(number_of_zeros)
