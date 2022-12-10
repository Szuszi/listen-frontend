import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewUserTrack } from 'src/app/model/new-user-track.model';
import { UserTrackService } from 'src/app/services/user-track.service';

@Component({
  selector: 'app-track-edit-page',
  templateUrl: './track-edit-page.component.html',
  styleUrls: ['./track-edit-page.component.css'],
})
export class TrackEditPageComponent implements OnInit {
  id: number | undefined;
  track: NewUserTrack | undefined;
  uploading: boolean = false;
  uploaded: boolean = false;
  deleted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userTrackService: UserTrackService
  ) {}

  ngOnInit(): void {
    this.loadUserTrack();
  }

  private loadUserTrack() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    console.log(this.id);

    this.userTrackService
      .getUserTrackById(this.id.toString())
      .subscribe(track => {
        this.track = track;
        console.log(this.track);
      });
  }

  onPressUpdate(): void {}

  onPressDelete(): void {}

  onDelete(): void {
    if (this.track && this.id) {
      this.uploading = true;

      this.userTrackService
        .deleteUserTrack(this.id.toString())
        .subscribe(resp => {
          this.uploading = false;
          this.deleted = true;
        });
    }
  }

  onSubmit(): void {
    if (this.track && this.id) {
      this.uploading = true;
      this.uploaded = false;

      this.userTrackService
        .editUserTrack(this.id.toString(), this.track)
        .subscribe(uploadedTrack => {
          this.track = uploadedTrack;
          this.uploading = false;
          this.uploaded = true;
        });
    }
  }
}
