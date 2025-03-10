import { Component,  inject,  Input,  } from '@angular/core';
// import { Strings } from '../../enum/strings.enum';
import { CourseService } from '../../services/course/course.service';
import { Course } from '../../interfaces/course.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses: Course[]=[];
  // @Input() courses: any;
  @Input() isAdmin= false;
  // @Output() del= new EventEmitter();
  coursesSub!:Subscription;
  private courseService = inject(CourseService);

constructor()
{}

  ngOnInit(){
     this.courses =this.courseService.getCourses();
  //   this.getCourses();


 this.coursesSub= this.courseService.courses.subscribe({
    next: (courses) => {
      this.courses=courses;
      console.log('courses', this.courses);

    },  
    error:(e)=>{
      console.log(e);
    }
  });
  }
  // getCourses(){
  //   const data=localStorage.getItem(Strings.STORAGE_KEY)
  //   console.log(data);
  //   if(data){
  //     this.courses=JSON.parse(data);
  //     // this.courses[0]={...this.courses[0],isActive: true};
  //   }
  // }


  deleteCourse(course: Course){
// this.del.emit(course);
this.courseService.deleteCourse(course);
  }
  ngOnDestoy(){
    console.log('courses ondestroy')
    if(this.coursesSub) this.coursesSub.unsubscribe();

  }


}