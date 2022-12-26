import { CarDto } from '../../controllers/car/car.validations';

const CarService = {
  createCar: (car: CarDto): CarDto => {
    return car;
  }
};

export default CarService;