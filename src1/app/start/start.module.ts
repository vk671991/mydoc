import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ChoosePage } from './choose/choose.page';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { HttpModule } from '@angular/http';
import { AuthServiceProvider } from '../../providers/auth-service';
import { ServiceProvider } from '../../providers/app.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpModule ,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginPage
      },
      {
        path: 'register',
        component: RegisterPage
      },
      {
        path: '',
        component: ChoosePage
      }
    ])
  ],
  declarations: [LoginPage,ChoosePage,RegisterPage],
  providers: [ AuthServiceProvider,ServiceProvider ]
})
export class StartPageModule {
	static forRoot(): ModuleWithProviders {
		return {
		  ngModule: StartPageModule,
		  providers: [ServiceProvider,AuthServiceProvider]
		};
	}
}
