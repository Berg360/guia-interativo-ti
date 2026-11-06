print('---------- programa que calcula o fatorial--------------')
print()

def fatorial(numero):
    if numero == 1:
        return 1
    else:
        return numero * fatorial(numero -1)
    
    num = int(input('digite um numero:'))
    print('o resultado do fatorial é: ',fatorial(num))
    
    
    
