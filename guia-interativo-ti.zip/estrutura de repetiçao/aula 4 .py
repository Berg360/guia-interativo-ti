print('----------- Progrma que conta pares----------')
print()

contapares = 0 
for contador in range(5):
    valor = int(input('digite um valor '))
    if valor % 2 == 0:
        contapares = contapares + 1 
        
        print('quantidade de pares: ',contapares)