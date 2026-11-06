print('progrma que calcula a média---------- ')
print()

notat = float(input('digite a nota téorica '))
notap = float(input('digite a nota prática  '))
notatr = float(input('digite a nota trabalho  '))

media = (notat + notap + notatr) / 3
print()

print('1 a média do aluno(a) é ',media)

if media > 69:
    print('aluno (a) aprovado')
else:
    print('aluno (a) reprovado')
    