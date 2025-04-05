import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  picture: string;
  user: {
    _id: string;
  };
}

interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  picture?: string;
  [key: string]: string | undefined;
}

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  [key: string]: string;
}

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  userForm: FormGroup;
  errorMessages: string[] = [];
  isLoading = false;
  isEditing = false;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  userId: string = '';
  private apiUrl = 'http://localhost:4000';

  countries = [
    'Egypt',
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Japan',
    'China',
  ];

  cities: { [key: string]: string[] } = {
    Egypt: [
      'Cairo',
      'Alexandria',
      'Giza',
      'Sharm El Sheikh',
      'Luxor',
      'Aswan',
      'Port Said',
      'Suez',
      'Mansoura',
      'Tanta',
      'Ismailia',
    ],
    'United States': [
      'New York',
      'Los Angeles',
      'Chicago',
      'Houston',
      'Phoenix',
      'Philadelphia',
      'San Antonio',
      'San Diego',
      'Dallas',
      'San Jose',
    ],
    Canada: [
      'Toronto',
      'Vancouver',
      'Montreal',
      'Calgary',
      'Ottawa',
      'Edmonton',
      'Quebec City',
      'Winnipeg',
      'Halifax',
      'Victoria',
    ],
    'United Kingdom': [
      'London',
      'Manchester',
      'Birmingham',
      'Glasgow',
      'Liverpool',
      'Edinburgh',
      'Leeds',
      'Bristol',
      'Sheffield',
      'Newcastle',
    ],
    Australia: [
      'Sydney',
      'Melbourne',
      'Brisbane',
      'Perth',
      'Adelaide',
      'Gold Coast',
      'Canberra',
      'Newcastle',
      'Wollongong',
      'Hobart',
    ],
    Germany: [
      'Berlin',
      'Hamburg',
      'Munich',
      'Cologne',
      'Frankfurt',
      'Stuttgart',
      'Düsseldorf',
      'Leipzig',
      'Dortmund',
      'Essen',
    ],
    France: [
      'Paris',
      'Marseille',
      'Lyon',
      'Toulouse',
      'Nice',
      'Nantes',
      'Strasbourg',
      'Montpellier',
      'Bordeaux',
      'Lille',
    ],
    Spain: [
      'Madrid',
      'Barcelona',
      'Valencia',
      'Seville',
      'Zaragoza',
      'Málaga',
      'Murcia',
      'Palma',
      'Bilbao',
      'Alicante',
    ],
    Italy: [
      'Rome',
      'Milan',
      'Naples',
      'Turin',
      'Palermo',
      'Genoa',
      'Bologna',
      'Florence',
      'Venice',
      'Verona',
    ],
    Japan: [
      'Tokyo',
      'Yokohama',
      'Osaka',
      'Nagoya',
      'Sapporo',
      'Fukuoka',
      'Kobe',
      'Kyoto',
      'Kawasaki',
      'Saitama',
    ],
    China: [
      'Shanghai',
      'Beijing',
      'Guangzhou',
      'Shenzhen',
      'Chengdu',
      'Tianjin',
      'Wuhan',
      'Xian',
      'Hangzhou',
      'Nanjing',
    ],
  };

  availableCities: string[] = [];

  isChangingPassword = false;
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9\s-]{8,}$/)],
      ],
      address: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      picture: [''],
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });

    this.userForm.get('country')?.valueChanges.subscribe((newCountry) => {
      const previousCountry = this.getStoredProfile()?.country;

      if (newCountry) {
        this.availableCities = this.cities[newCountry] || [];
        if (this.isEditing && newCountry !== previousCountry) {
          this.userForm.patchValue({ city: '' });
        }
      }
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      if (tokenPayload.id) {
        this.userId = tokenPayload.id;

        const storedProfile = this.getStoredProfile();
        if (storedProfile) {
          this.userForm.patchValue({
            firstName: storedProfile.firstName,
            lastName: storedProfile.lastName,
            phoneNumber: storedProfile.phoneNumber,
            address: storedProfile.address,
            country: storedProfile.country,
            city: storedProfile.city,
          });
          if (storedProfile.picture) {
            this.imagePreview = this.getImageUrl(storedProfile.picture);
          }
          if (storedProfile.country) {
            this.availableCities = this.cities[storedProfile.country] || [];
          }
        }

        this.fetchUserProfile();
      }
    } catch (error) {
      console.error('Error parsing token:', error);
      this.router.navigate(['/login']);
    }

    if (!this.isEditing) {
      Object.keys(this.userForm.controls).forEach((key) => {
        if (key !== 'picture') {
          this.userForm.get(key)?.disable();
        }
      });
    }
  }

  fetchUserProfile() {
    const token = localStorage.getItem('token');
    if (!token || !this.userId) return;

    this.isLoading = true;
    this.http
      .get<{ status: string; data: UserProfile }>(
        `http://localhost:4000/api/profile/${this.userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .subscribe({
        next: (response) => {
          if (response.data) {
            this.saveProfileToLocalStorage(response.data);

            this.userForm.patchValue(response.data);
            if (response.data.picture) {
              this.imagePreview = this.getImageUrl(response.data.picture);
            }
            if (response.data.country) {
              this.availableCities = this.cities[response.data.country] || [];
            }

            if (!this.isEditing) {
              Object.keys(this.userForm.controls).forEach((key) => {
                this.userForm.get(key)?.disable();
              });
            }
          }
        },
        error: (error) => {
          this.errorMessages = [
            error.error?.message || 'Failed to fetch user profile',
          ];
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  enableEditing() {
    this.isEditing = true;
    Object.keys(this.userForm.controls).forEach((key) => {
      if (key !== 'picture') {
        this.userForm.get(key)?.enable();
      }
    });
  }

  cancelEditing() {
    this.isEditing = false;
    const storedProfile = this.getStoredProfile();
    if (storedProfile) {
      this.userForm.patchValue(storedProfile);
      if (storedProfile.picture) {
        this.imagePreview = this.getImageUrl(storedProfile.picture);
      }
      if (storedProfile.country) {
        this.availableCities = this.cities[storedProfile.country] || [];
      }
    }
    Object.keys(this.userForm.controls).forEach((key) => {
      this.userForm.get(key)?.disable();
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessages = [];

    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const userId = tokenPayload.id;

    const updateData: UpdateProfileData & { user: string } = {
      user: userId,
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      phoneNumber: this.userForm.get('phoneNumber')?.value,
      address: this.userForm.get('address')?.value,
      country: this.userForm.get('country')?.value,
      city: this.userForm.get('city')?.value,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        updateData.picture = base64String;
        this.sendUpdateRequest(updateData, token);
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.sendUpdateRequest(updateData, token);
    }
  }

  private sendUpdateRequest(data: any, token: string) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    this.http
      .put<{ status: string; data: UserProfile; message: string }>(
        `${this.apiUrl}/api/profile/${this.userId}`,
        data,
        { headers }
      )
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.saveProfileToLocalStorage(response.data);

            if (response.data.country) {
              this.availableCities = this.cities[response.data.country] || [];
            }

            this.userForm.patchValue({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              phoneNumber: response.data.phoneNumber,
              address: response.data.address,
              country: response.data.country,
              city: response.data.city,
            });

            if (response.data.picture) {
              this.imagePreview = this.getImageUrl(response.data.picture);
            }

            this.isEditing = false;
            Object.keys(this.userForm.controls).forEach((key) => {
              this.userForm.get(key)?.disable();
            });

            this.errorMessages = ['Profile updated successfully'];
            this.selectedFile = null;
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Profile update error:', error);
          this.errorMessages = [
            error.error?.message || 'Failed to update profile',
          ];
        },
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.errorMessages = ['Please select an image file'];
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this.errorMessages = ['Image size should be less than 5MB'];
        return;
      }

      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  private saveProfileToLocalStorage(profile: UserProfile) {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }

  getStoredProfile(): UserProfile | null {
    const storedProfile = localStorage.getItem('userProfile');
    return storedProfile ? JSON.parse(storedProfile) : null;
  }

  private getImageUrl(picture: string): string {
    if (!picture) return '';

    if (picture.startsWith('data:image')) {
      return picture;
    }

    if (picture.startsWith('http')) {
      return picture;
    }

    return `${this.apiUrl}${picture}`;
  }

  startPasswordChange() {
    this.isChangingPassword = true;
    this.errorMessages = [];
  }

  cancelPasswordChange() {
    this.isChangingPassword = false;
    this.passwordForm.reset();
    this.errorMessages = [];
  }

  onPasswordSubmit() {
    if (this.passwordForm.valid) {
      const { oldPassword, newPassword, confirmPassword } =
        this.passwordForm.value;

      if (newPassword !== confirmPassword) {
        this.errorMessages = ['New password and confirm password do not match'];
        return;
      }

      this.isLoading = true;
      this.errorMessages = [];

      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/login']);
        return;
      }

      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenPayload.id;

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http
        .patch<{ status: string; message: string }>(
          `http://localhost:4000/api/auth/update-password/${userId}`,
          {
            oldPassword,
            newPassword,
            confirmPassword,
          },
          { headers }
        )
        .subscribe({
          next: (response) => {
            if (response.status === 'success') {
              this.errorMessages = ['Password updated successfully'];
              this.isChangingPassword = false;
              this.passwordForm.reset();
            }
          },
          error: (error) => {
            this.isLoading = false;
            if (error.status === 401) {
              this.errorMessages = ['Current password is incorrect'];
            } else {
              this.errorMessages = [
                error.error?.message || 'Failed to update password',
              ];
            }
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    } else {
      this.errorMessages = ['Please fill all required fields'];
    }
  }
}
