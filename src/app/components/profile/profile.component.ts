import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface ProfileResponse {
  status: string;
  data: any;
  message: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  errorMessages: string[] = [];
  isLoading = false;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  currentFocusedInput: string | null = null;
  userId: string = '';

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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      lastName: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      phoneNumber: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(/^\+?[0-9\s-]{8,}$/),
        ],
        nonNullable: true,
      }),
      address: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      city: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      country: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      picture: new FormControl(null, [Validators.required]),
    });

    this.profileForm.get('country')?.valueChanges.subscribe((country) => {
      this.availableCities = this.cities[country] || [];
      this.profileForm.patchValue({ city: '' });
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/signup']);
      return;
    }

    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      if (tokenPayload.id) {
        this.userId = tokenPayload.id;
      }
    } catch (error) {
      console.error('Error parsing token:', error);
      this.router.navigate(['/signup']);
    }
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
      this.profileForm.patchValue({ picture: file });
      this.profileForm.get('picture')?.updateValueAndValidity();

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (!this.profileForm.valid || !this.selectedFile) {
      Object.keys(this.profileForm.controls).forEach((key) => {
        const control = this.profileForm.get(key);
        control?.markAsTouched();
      });
      this.errorMessages = [
        'Please fill in all required fields including profile picture',
      ];
      return;
    }

    this.isLoading = true;
    const signupData = JSON.parse(localStorage.getItem('signupData') || '{}');

    if (!signupData.userId) {
      this.errorMessages = [
        'User data not found. Please try signing up again.',
      ];
      return;
    }

    const profileData = {
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('lastName')?.value,
      phoneNumber: this.profileForm.get('phoneNumber')?.value,
      address: this.profileForm.get('address')?.value,
      city: this.profileForm.get('city')?.value,
      country: this.profileForm.get('country')?.value,
    };

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;

        const completeProfileData = {
          ...profileData,
          picture: base64String,
        };

        this.sendProfileData(completeProfileData, signupData.userId);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  private sendProfileData(profileData: any, userId: string) {
    this.http
      .post<ProfileResponse>(
        `http://localhost:4000/api/profile/${userId}`,
        profileData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            localStorage.setItem('userProfile', JSON.stringify(response.data));
            this.router.navigate(['/verify-otp']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error?.message) {
            this.errorMessages = [error.error.message];
          } else {
            this.errorMessages = ['Failed to create profile'];
          }
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  onFocus(fieldName: string) {
    this.currentFocusedInput = fieldName;
  }

  onBlur() {
    this.currentFocusedInput = null;
  }

  onEditProfile() {
    this.profileForm.enable();
  }
}
