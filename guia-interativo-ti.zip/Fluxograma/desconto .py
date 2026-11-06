print('----------programa de desconto----------')
print()

menu = 'yes'
while menu == 'yes':
    valor = float(input('digite um valor: '))
    percentual = float(input('digite um percentual: '))/100
    resultado = valor * percentual
    
    
    print('o desconto é de: ',resultado)
    print()
    menu = input('digite yes para continuar ou no para sair')