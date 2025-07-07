import os

base_dir = "E:/DeepFakeRadar/data/deepfake_dataset"

def list_dataset_structure(base_path):
    for root, dirs, files in os.walk(base_path):
        level = root.replace(base_path, '').count(os.sep)
        indent = '│   ' * level + '├── '
        print(f"{indent}{os.path.basename(root)}/")
        subindent = '│   ' * (level + 1)
        for f in files:
            print(f"{subindent}{f}")

list_dataset_structure(base_dir)