import {Component} from '@angular/core';
import {ProjectTypeEnum} from '@common/nested-project-view/nested-project-view-page/nested-project-view-page.component';
import {CircleTypeEnum} from '~/shared/constants/non-common-consts';
import {ProjectsSharedModule} from '~/features/projects/shared/projects-shared.module';
import {SMSharedModule} from '@common/shared/shared.module';
import {AsyncPipe, NgIf} from '@angular/common';
import {ReportsPageComponent} from '@common/reports/reports-page/reports-page.component';
import {getAllProjectsPageProjects, resetProjects, setProjectsOrderBy} from '@common/projects/common-projects.actions';
import {setDefaultNestedModeForFeature} from '@common/core/actions/projects.actions';
import {selectMainPageTagsFilter, selectMainPageTagsFilterMatchMode} from "@common/core/reducers/projects.reducer";
import {combineLatest, Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'sm-nested-reports-page',
  templateUrl: './nested-reports-page.component.html',
  styleUrls: ['../../nested-project-view/nested-project-view-page/nested-project-view-page.component.scss'],
  imports: [
    ProjectsSharedModule,
    SMSharedModule,
    AsyncPipe,
    NgIf
  ],
  standalone: true
})
export class NestedReportsPageComponent extends ReportsPageComponent {
  entityTypeEnum = ProjectTypeEnum;
  circleTypeEnum = CircleTypeEnum;
  hideMenu = false;
  entityType = ProjectTypeEnum.reports;
  private mainPageFilterSub: Subscription;
  projectCardClicked(data: { hasSubProjects: boolean; id: string; name: string }) {
    if (data.hasSubProjects) {
      this.router.navigate([data.id, 'projects'], {relativeTo: this.route.parent?.parent});
    } else {
      this.router.navigate([data.id, this.entityType], {relativeTo: this.route.parent?.parent});
    }
  }

  protected getReports() {
    // Override getReports from reports page - we need projects (from common-projects), not reports.
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getExtraProjects(selectedProjectId, selectedProject) {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  orderByChanged(sortByFieldName: string) {
    this.store.dispatch(setProjectsOrderBy({orderBy: sortByFieldName}));
  }

  loadMore() {
    this.store.dispatch(getAllProjectsPageProjects());
  }

  toggleNestedView(nested: boolean) {
    this.store.dispatch(setDefaultNestedModeForFeature({feature: this.entityType, isNested: nested}));
    if (!nested) {
      this.router.navigateByUrl(this.entityType);
    }
  }
  ngOnInit() {
    super.ngOnInit();
    this.mainPageFilterSub = combineLatest([
      this.store.select(selectMainPageTagsFilter),
      this.store.select(selectMainPageTagsFilterMatchMode)
    ]).pipe(debounceTime(0))
      .subscribe(() => {
        this.store.dispatch(resetProjects());
        this.store.dispatch(getAllProjectsPageProjects());
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.mainPageFilterSub.unsubscribe();
  }

}
