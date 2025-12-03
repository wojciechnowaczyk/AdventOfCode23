input_file = "input.txt"

finalAnswer = 0

with open(input_file, "r") as file:
    for line in file:
        digits = list(line.strip())
        max_pair = 0
        for i in range(len(digits)):
            for j in range(i+1, len(digits)):
                pair = int(digits[i] + digits[j])
                if pair > max_pair:
                    max_pair = pair
        finalAnswer += max_pair

print(finalAnswer)