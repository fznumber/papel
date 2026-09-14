import trimesh

try:
    screw = trimesh.load('stl_tornillos_v1/tornillo_single.stl', force='mesh')
    print(f"Screw: watertight={screw.is_watertight}, bodies={len(screw.split())}")
except Exception as e:
    print(f"Error loading screw: {e}")

try:
    coupler = trimesh.load('stl_tornillos_v1/acoplador_eje.stl', force='mesh')
    print(f"Coupler: watertight={coupler.is_watertight}, bodies={len(coupler.split())}")
except Exception as e:
    print(f"Error loading coupler: {e}")
