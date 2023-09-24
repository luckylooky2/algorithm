#! bin/bash

declare count_map

js_num=$(find . -type f -name '*[0-9].js' | wc -l | tr -d ' ')
cpp_num=$(find . -type f -name '*[0-9].cpp' | wc -l | tr -d ' ')
c_num=$(find . -type f -name '*[0-9].c' | wc -l | tr -d ' ')
py_num=$(find . -type f -name '*[0-9].py' | wc -l | tr -d ' ')

count_map[${js_num}]="![](https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=JavaScript&logoColor=white)"
count_map[${cpp_num}]="![](https://img.shields.io/badge/C++-00599C?style=flat&logo=C++&logoColor=white)"
count_map[${c_num}]="![](https://img.shields.io/badge/C-A8B9CC?style=flat&logo=c&logoColor=white)"
count_map[${py_num}]="![](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)"

array=(${js_num} ${c_num} ${cpp_num} ${py_num})
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

# echo "통계 정보를 README.md 파일에 추가하세요." > README.md