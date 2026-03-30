import {StructureBuilder} from 'sanity/structure'
import {
  DocumentTextIcon,
  UserIcon,
  StarIcon,
  TrendUpwardIcon as TrendingUpIcon,
  PlayIcon,
  CalendarIcon,
  BulbOutlineIcon,
  SparklesIcon,
} from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('DancerGirl Content Studio')
    .items([
      // ARTICLES BY SECTION
      S.listItem()
        .title('Stories & Articles')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Stories & Articles')
            .items([
              S.listItem()
                .title('All Articles')
                .icon(DocumentTextIcon)
                .child(S.documentTypeList('article').title('All Articles')),
              S.divider(),
              S.listItem()
                .title('Money Moves')
                .icon(TrendingUpIcon)
                .child(
                  S.documentList()
                    .title('Money Moves')
                    .filter('_type == "article" && section == "money-moves"')
                ),
              S.listItem()
                .title('Choreographers Corner')
                .icon(SparklesIcon)
                .child(
                  S.documentList()
                    .title('Choreographers Corner')
                    .filter('_type == "article" && section == "choreographers-corner"')
                ),
              S.listItem()
                .title('Dancers: Speak Up')
                .icon(BulbOutlineIcon)
                .child(
                  S.documentList()
                    .title('Dancers: Speak Up')
                    .filter('_type == "article" && section == "dancer-speak-up"')
                ),
              S.divider(),
              S.listItem()
                .title('Featured Articles')
                .icon(StarIcon)
                .child(
                  S.documentList()
                    .title('Featured Articles')
                    .filter('_type == "article" && featured == true')
                ),
            ])
        ),

      // DANCER OF THE MONTH
      S.listItem()
        .title('Dancer of the Month')
        .icon(StarIcon)
        .child(
          S.list()
            .title('Dancer of the Month')
            .items([
              S.listItem()
                .title('Current Feature')
                .icon(StarIcon)
                .child(
                  S.documentList()
                    .title('Currently Featured')
                    .filter('_type == "dancerOfTheMonth" && isFeatured == true')
                ),
              S.listItem()
                .title('Archive')
                .icon(DocumentTextIcon)
                .child(S.documentTypeList('dancerOfTheMonth').title('All Dancers of the Month')),
            ])
        ),

      // EDITOR LETTERS
      S.listItem()
        .title('Letters from the Editor')
        .icon(DocumentTextIcon)
        .child(S.documentTypeList('editorLetter').title('All Editor Letters')),

      // EVENTS
      S.listItem()
        .title('Events')
        .icon(CalendarIcon)
        .child(S.documentTypeList('event').title('All Events')),

      S.divider(),

      // MEDIA
      S.listItem()
        .title('Music & Media')
        .icon(PlayIcon)
        .child(
          S.list()
            .title('Music & Media')
            .items([
              S.listItem()
                .title('Videos')
                .icon(PlayIcon)
                .child(S.documentTypeList('video').title('All Videos')),
              S.listItem()
                .title('Playlists')
                .icon(PlayIcon)
                .child(S.documentTypeList('playlist').title('All Playlists')),
            ])
        ),

      S.divider(),

      // SITE SETTINGS
      S.listItem()
        .title('About / Founder')
        .icon(UserIcon)
        .child(S.documentTypeList('founder').title('Founder Profile')),

      // RECENT ACTIVITY
      S.listItem()
        .title('Recent Activity')
        .icon(TrendingUpIcon)
        .child(
          S.documentList()
            .title('Recently Updated')
            .filter('_type in ["article", "dancerOfTheMonth", "editorLetter", "event", "video", "playlist"]')
            .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
        ),
    ])
