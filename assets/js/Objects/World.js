class World {
  constructor(objArray, scene) {
    this.objects = objArray;
    this.init(scene);
  }

  init(scene) {
    this.objects.forEach((object) => {
      scene.add(object.mesh);
    });
  }
}
export default World;
