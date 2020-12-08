import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Profile } from 'src/app/models/profile';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from 'rxjs';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  profileForm: FormGroup = null;

  editProfile: Profile = null;
  profileId: string;

  user = this.authService.userDataSubject$;
  user2: User;

  profile: Profile = null;

  loading: boolean;
  allProfiles: Array<Profile> = [];
  profiles: Array<Profile> = [];

  profileKey: string;

  showMyMessage = false;

  constructor(private profileService: ProfileService, private authService: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllProfiles();
  }

  createForm(): void {
    this.profileForm = this.fb.group({
      name: [''],
      lastname: [''],
      email: [''],
      password: [''],
      birthday: [''],
      birthmonth: [''],
      birthyear: [''],
    });
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe((response) => {
      this.user2 = response;
    });
  }

  createProfile(newProfile: Profile, userId: string): void {
    this.profileService.createProfile(newProfile, userId).then(res => {

    }).catch(err => console.log(err));
  }

  updateProfile(newProfile: Profile, userId: string): void {
    this.profileService.updateProfile(newProfile, userId).then(res => {
    }).catch(err => console.log(err))
  }


  onSubmit(): void {
    this.authService.singUpWithCredentials(this.profileForm.get('email').value,
      this.profileForm.get('password').value).then(() => {
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        window.alert("Datos invalidos: " + err)
        console.log('error!', err)
      });

    this.authService.getCurrentUser().subscribe((user2) => {
      if (user2) {
        this.user2 = user2;
        const newProfile: Profile = {
          userId: this.user2.uid,
          name: this.profileForm.get('name').value,
          lastname: this.profileForm.get('lastname').value,
          email: this.profileForm.get('email').value,
          password: this.profileForm.get('password').value,
          birthday: this.profileForm.get('birthday').value,
          birthmonth: this.profileForm.get('birthmonth').value,
          birthyear: this.profileForm.get('birthyear').value,
        }
        this.createProfile(newProfile, this.user2.uid);
      }
    });
  }

  updateOnSubmit(): void {
    this.authService.getCurrentUser().subscribe((user2) => {
      if (user2) {
        this.user2 = user2;
        const newProfile: Profile = {
          userId: this.user2.uid,
          name: this.profileForm.get('name').value,
          lastname: this.profileForm.get('lastname').value,
          email: this.profileForm.get('email').value,
          password: this.profileForm.get('password').value,
          birthday: this.profileForm.get('birthday').value,
          birthmonth: this.profileForm.get('birthmonth').value,
          birthyear: this.profileForm.get('birthyear').value,
        }
        this.addToEditProfile();
        this.updateProfile(newProfile, this.user2.uid);
      }
    });
    this.showMessage();
  }

  addToEditProfile(): void {
    this.editProfile = {
      userId: this.user2.uid,
      name: this.profileForm.get('name').value,
      lastname: this.profileForm.get('lastname').value,
      email: this.profileForm.get('email').value,
      password: this.profileForm.get('password').value,
      birthday: this.profileForm.get('birthday').value,
      birthmonth: this.profileForm.get('birthmonth').value,
      birthyear: this.profileForm.get('birthyear').value,
    }
  }

  getAllProfiles(): void {
    this.loading = true;
    this.profileService.getAllProfiles().subscribe((items) => {
      this.allProfiles = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Profile)
      );
      this.loading = false;
      this.getMyProfile();
    });
  }

  getMyProfile(): void {
    this.authService.getCurrentUser().subscribe((user2) => {
      if (user2) {
        this.user2 = user2;
        this.profileService.getProfile(user2.uid).then((res) => {
          if (res.docs.length > 0) {
            this.profileForm.patchValue({
              name: res.docs[0].get('name'),
              lastname: res.docs[0].get('lastname'),
              email: res.docs[0].get('email'),
              password: res.docs[0].get('password'),
              birthday: res.docs[0].get('birthday'),
              birthmonth: res.docs[0].get('birthmonth'),
              birthyear: res.docs[0].get('birthyear'),
            });
          }
        });
      }
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(response => {
      this.router.navigate(['/'])
    }).catch((err) => {
      window.alert("Daros invalidos: " + err)
      console.log(err)
    });
  }

  showMessage(): void {
    this.showMyMessage = true
  }

  hideMessage(): void {
    this.showMyMessage = false
  }
}