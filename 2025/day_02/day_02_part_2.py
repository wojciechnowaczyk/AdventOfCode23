ranges = '67562556-67743658,62064792-62301480,4394592-4512674,3308-4582,69552998-69828126,9123-12332,1095-1358,23-48,294-400,3511416-3689352,1007333-1150296,2929221721-2929361280,309711-443410,2131524-2335082,81867-97148,9574291560-9574498524,648635477-648670391,1-18,5735-8423,58-72,538-812,698652479-698760276,727833-843820,15609927-15646018,1491-1766,53435-76187,196475-300384,852101-903928,73-97,1894-2622,58406664-58466933,6767640219-6767697605,523453-569572,7979723815-7979848548,149-216'

output = 0


def is_repetitive(sequence):
    n = len(sequence)
    for substring_length in range(1, n // 2 + 1):
        if n % substring_length == 0:
            base_substring = sequence[:substring_length]
            repeat_count = n // substring_length
            hypothetical_sequence = base_substring * repeat_count
            if sequence == hypothetical_sequence and repeat_count >= 2:
                return True
    return False

for line in ranges.split(','):
    start, end = line.split('-')
    start, end = int(start), int(end)
    for number in range(start, end+1):
        if is_repetitive(str(number)):
            output += number

print(output)
