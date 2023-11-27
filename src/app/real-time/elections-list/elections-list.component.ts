import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';
import { RealTimeService } from 'src/app/services/realTime/real-time.service';

@Component({
  selector: 'app-elections-list',
  templateUrl: './elections-list.component.html',
  styleUrls: ['./elections-list.component.less']
})
export class ElectionsListComponent {
  exerciseList: any;

  constructor(private exerciseApi: RealTimeService, private router: Router){
    this.getExercises();
  }

  getExercises(){
    this.exerciseApi.getAllExcersices().subscribe(
      (res) =>{
        this.exerciseList = res;
      },
      (err)=>{

      }
    );
  }

  // Método para alternar la propiedad showDetails del ejercicio
  toggleDetails(exercise: any) {
    this.router.navigate(['realTime/results/',exercise.exercise_id]);
  }

}
