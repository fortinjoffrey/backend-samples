#!/bin/bash

echo "Deleting existing schemas..."
rm -rf src/generated/schemas/*.json

generate_schema() {
  local type_name="${1}Request"
  local base_name=$(echo "$type_name" | sed -e 's/\([a-z]\)\([A-Z]\)/\1_\2/g' | tr '[:upper:]' '[:lower:]')
  local file_path="src/requests/${base_name}.ts"
  local output_path="src/generated/schemas/${base_name}.schema.json"
  ts-json-schema-generator --path "$file_path" --type "$type_name" --out "$output_path"
  echo "Schema generated for $type_name."
}

# Liste des types pour lesquels générer des schémas
types=(
  "Id"
  "CreatePerson"
  "UpdatePerson"
  "GetPerson"
  "CreateEmployee"
  "UpdateEmployee"
)

# Boucle sur chaque type pour générer les schémas
for type in "${types[@]}"; do
  generate_schema "$type" &
done

# Attendre que tous les processus en arrière-plan se terminent
wait

echo "Schemas generated successfully."
