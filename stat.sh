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

array=($((js_b + js_p)) $((c_b + c_p)) $((cpp_b + cpp_p)) $((py_b + py_p)))

count_map[$((js_b + js_p))]="![](https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=JavaScript&logoColor=white)"
count_map[$((c_b + c_p))]="![](https://img.shields.io/badge/C++-00599C?style=flat&logo=cplusplus&logoColor=white)"
count_map[$((cpp_b + cpp_p))]="![](https://img.shields.io/badge/C-A8B9CC?style=flat&logo=c&logoColor=white)"
count_map[$((py_b + py_p))]="![](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)"

sorted_array=($(for element in "${array[@]}"; do
  echo "$element"
done | sort -r))

total=0

for number in "${sorted_array[@]}"; do
  total=$((total + number))
done

echo "
| Language  | Number of solved problems |
|:---|---:|
|${count_map[sorted_array[0]]}|${sorted_array[0]}|
|${count_map[sorted_array[1]]}|${sorted_array[1]}|
|${count_map[sorted_array[2]]}|${sorted_array[2]}|
|${count_map[sorted_array[3]]}|${sorted_array[3]}|
|Total| ${total}|
" > README.md
