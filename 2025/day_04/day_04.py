input_file = "input.txt"

numberOfRolls = 0

with open(input_file, "r") as file:
    lines = [line.strip() for line in file]
    numberOfLines = len(lines)
    for lineIndex, line in enumerate(lines):
        rollsRow = list(line)
        previousRollsRow = list(lines[lineIndex - 1]) if lineIndex > 0 else None
        nextRollsRow = list(lines[lineIndex + 1]) if lineIndex < numberOfLines - 1 else None
        for placeIndex, place in enumerate(rollsRow):
            isLastEl = (placeIndex + 1) == len(rollsRow)
            if place == "@":
                tempNumberOfRolls = 0
                # checking current line
                if placeIndex != 0 and rollsRow[placeIndex - 1] == "@":
                    tempNumberOfRolls += 1
                if not isLastEl and rollsRow[placeIndex + 1] == "@":
                    tempNumberOfRolls += 1
                # checking next line
                if nextRollsRow:
                    if nextRollsRow[placeIndex] == "@":
                        tempNumberOfRolls += 1
                    if placeIndex != 0 and nextRollsRow[placeIndex - 1] == "@":
                        tempNumberOfRolls += 1
                    if not isLastEl and nextRollsRow[placeIndex + 1] == "@":
                        tempNumberOfRolls += 1
                # checking previous line
                if previousRollsRow:
                    if previousRollsRow[placeIndex] == "@":
                        tempNumberOfRolls += 1
                    if placeIndex != 0 and previousRollsRow[placeIndex - 1] == "@":
                        tempNumberOfRolls += 1
                    if not isLastEl and previousRollsRow[placeIndex + 1] == "@":
                        tempNumberOfRolls += 1

                if tempNumberOfRolls < 4:
                    numberOfRolls += 1
print(numberOfRolls)
