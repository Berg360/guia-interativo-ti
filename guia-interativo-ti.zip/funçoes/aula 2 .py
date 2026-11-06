print('--------------- programa de conversão--------------')
print()

def converter(celsius):
    return (celsius * 9 / 5) + 32

graus = float(input('digite o valor de graus celsisus:'))
print('o resultado da conversão é: ',converter(graus))
