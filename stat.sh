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

arrayByLanguage=($((js_b + js_p)) $((cpp_b + cpp_p)) $((py_b + py_p)) $((c_b + c_p)))
arrayByPlatform=($((js_b + cpp_b + c_b + py_b - duplicate_b)) $((js_p + cpp_p + c_p + py_p - duplicate_p)))

total=0
duplicate=$((duplicate_b + duplicate_p))

for number in "${arrayByLanguage[@]}"; do
  total=$((total + number))
done

echo "
| Language  | Number of solved problems |
|:---|---:|
|![](https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=JavaScript&logoColor=white)|${arrayByLanguage[0]}|
|![](https://img.shields.io/badge/C++-00599C?style=flat&logo=cplusplus&logoColor=white)|${arrayByLanguage[1]}|
|![](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)|${arrayByLanguage[2]}|
|![](https://img.shields.io/badge/C-A8B9CC?style=flat&logo=c&logoColor=white)|${arrayByLanguage[3]}|
|Total| $((total - duplicate))|

| Platform  | Number of solved problems |
|:---|---:|
|![baekjoon]("https://github.com/luckylooky2/algorithm/assets/85822311/4d8a8f6e-4414-472b-8f7c-d3020fc322df")|${arrayByPlatform[0]}|
|![programmers]("https://github.com/luckylooky2/algorithm/assets/85822311/9956c5c1-e76d-4fc1-aa9e-3177b9451db0")|${arrayByPlatform[1]}|
|Total| $((total - duplicate))|
" > README.md
