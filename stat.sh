#! bin/bash

declare count_map

js_b=$(find ./baekjoon -type f -name '*[0-9].js' | wc -l | tr -d ' ')
cpp_b=$(find ./baekjoon -type f -name '*[0-9].cpp' | wc -l | tr -d ' ')
c_b=$(find ./baekjoon -type f -name '*[0-9].c' | wc -l | tr -d ' ')
py_b=$(find ./baekjoon -type f -name '*[0-9].py' | wc -l | tr -d ' ')
js_p=$(find ./programmers -type f -name '*.js' | wc -l | tr -d ' ')
cpp_p=$(find ./programmers -type f -name '*.cpp' | wc -l | tr -d ' ')
c_p=$(find ./programmers -type f -name '*.c' | wc -l | tr -d ' ')
py_p=$(find ./programmers -type f -name '*.py' | wc -l | tr -d ' ')

duplicate_b=$(find ./baekjoon -type f -name '*[0-9].*' -exec basename {} \; | sed 's/\..*$//' | sort | uniq -d | wc -l)
duplicate_p=$(find ./programmers -type f -name '*' -exec basename {} \; | sed 's/\..*$//' | sort | uniq -d | wc -l)

array=($((js_b + js_p)) $((cpp_b + cpp_p)) $((py_b + py_p)) $((c_b + c_p)))

total=0
duplicate=$((duplicate_b + duplicate_p))

for number in "${array[@]}"; do
  total=$((total + number))
done

echo "
| Language  | Number of solved problems |
|:---|---:|
|![](https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=JavaScript&logoColor=white)|${array[0]}|
|![](https://img.shields.io/badge/C++-00599C?style=flat&logo=cplusplus&logoColor=white)|${array[1]}|
|![](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)|${array[2]}|
|![](https://img.shields.io/badge/C-A8B9CC?style=flat&logo=c&logoColor=white)|${array[3]}|
|Total| $((total - duplicate))|
" > README.md
